local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

return function(config, results)
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")

    -- Destroy old loading screen if exists
    local old = playerGui:FindFirstChild("AegisPassLoading")
    if old then old:Destroy() end

    -- ScreenGui
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "AegisPassLoading"
    screenGui.ResetOnSpawn = false
    screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    screenGui.DisplayOrder = 999999
    screenGui.Parent = playerGui

    -- Center card ONLY — no backdrop, no dark background
    local card = Instance.new("Frame")
    card.Size = UDim2.new(0, 400, 0, 140)
    card.Position = UDim2.new(0.5, -200, 0.5, -70)
    card.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
    card.BorderSizePixel = 0
    card.Parent = screenGui

    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = card

    local stroke = Instance.new("UIStroke")
    stroke.Color = Color3.fromRGB(45, 45, 55)
    stroke.Thickness = 1
    stroke.Parent = card

    -- Left side: text + progress
    local leftSide = Instance.new("Frame")
    leftSide.Size = UDim2.new(1, -110, 1, 0)
    leftSide.Position = UDim2.new(0, 20, 0, 0)
    leftSide.BackgroundTransparency = 1
    leftSide.Parent = card

    -- Title
    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, 0, 0, 28)
    title.Position = UDim2.new(0, 0, 0, 20)
    title.BackgroundTransparency = 1
    title.Text = config.ScriptName
    title.TextColor3 = Color3.fromRGB(240, 240, 245)
    title.Font = Enum.Font.GothamBold
    title.TextSize = 22
    title.TextXAlignment = Enum.TextXAlignment.Left
    title.Parent = leftSide

    -- Version
    local version = Instance.new("TextLabel")
    version.Size = UDim2.new(1, 0, 0, 16)
    version.Position = UDim2.new(0, 0, 0, 50)
    version.BackgroundTransparency = 1
    version.Text = "v" .. config.Version
    version.TextColor3 = Color3.fromRGB(140, 140, 150)
    version.Font = Enum.Font.Gotham
    version.TextSize = 13
    version.TextXAlignment = Enum.TextXAlignment.Left
    version.Parent = leftSide

    -- Status
    local status = Instance.new("TextLabel")
    status.Name = "Status"
    status.Size = UDim2.new(1, 0, 0, 18)
    status.Position = UDim2.new(0, 0, 0, 82)
    status.BackgroundTransparency = 1
    status.Text = "Validating..."
    status.TextColor3 = Color3.fromRGB(180, 180, 190)
    status.Font = Enum.Font.Gotham
    status.TextSize = 13
    status.TextXAlignment = Enum.TextXAlignment.Left
    status.Parent = leftSide

    -- Progress bar
    local barBg = Instance.new("Frame")
    barBg.Size = UDim2.new(1, 0, 0, 3)
    barBg.Position = UDim2.new(0, 0, 0, 110)
    barBg.BackgroundColor3 = Color3.fromRGB(40, 40, 50)
    barBg.BorderSizePixel = 0
    barBg.Parent = leftSide

    local barBgCorner = Instance.new("UICorner")
    barBgCorner.CornerRadius = UDim.new(1, 0)
    barBgCorner.Parent = barBg

    local barFill = Instance.new("Frame")
    barFill.Size = UDim2.new(0, 0, 1, 0)
    barFill.BackgroundColor3 = Color3.fromRGB(0, 170, 255)
    barFill.BorderSizePixel = 0
    barFill.Parent = barBg

    local barFillCorner = Instance.new("UICorner")
    barFillCorner.CornerRadius = UDim.new(1, 0)
    barFillCorner.Parent = barFill

    -- Right side: Avatar
    local avatarFrame = Instance.new("Frame")
    avatarFrame.Size = UDim2.new(0, 70, 0, 70)
    avatarFrame.Position = UDim2.new(1, -90, 0.5, -35)
    avatarFrame.BackgroundColor3 = Color3.fromRGB(35, 35, 40)
    avatarFrame.BorderSizePixel = 0
    avatarFrame.Parent = card

    local avatarCorner = Instance.new("UICorner")
    avatarCorner.CornerRadius = UDim.new(0, 8)
    avatarCorner.Parent = avatarFrame

    local avatarStroke = Instance.new("UIStroke")
    avatarStroke.Color = Color3.fromRGB(55, 55, 65)
    avatarStroke.Thickness = 1
    avatarStroke.Parent = avatarFrame

    local avatarImg = Instance.new("ImageLabel")
    avatarImg.Size = UDim2.new(1, -4, 1, -4)
    avatarImg.Position = UDim2.new(0, 2, 0, 2)
    avatarImg.BackgroundTransparency = 1
    avatarImg.Image = ""
    avatarImg.Parent = avatarFrame

    -- Load avatar async
    task.spawn(function()
        local success, thumb = pcall(function()
            return Players:GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size420x420)
        end)
        if success then
            avatarImg.Image = thumb
        end
    end)

    -- Helpers
    local function update(text, progress, color)
        status.Text = text
        if color then
            status.TextColor3 = color
            barFill.BackgroundColor3 = color
        end
        if progress then
            TweenService:Create(barFill, TweenInfo.new(0.3, Enum.EasingStyle.Quad), {
                Size = UDim2.new(progress, 0, 1, 0)
            }):Play()
        end
        task.wait(0.4)
    end

    local function finish(finalText, finalColor, success)
        update(finalText, 1, finalColor)
        task.wait(success and 1.2 or 2)

        TweenService:Create(card, TweenInfo.new(0.4, Enum.EasingStyle.Quad), {
            Position = UDim2.new(0.5, -200, 0.5, -60),
            BackgroundTransparency = 1
        }):Play()

        for _, child in ipairs(card:GetDescendants()) do
            if child:IsA("TextLabel") or child:IsA("Frame") or child:IsA("ImageLabel") then
                TweenService:Create(child, TweenInfo.new(0.3), {
                    BackgroundTransparency = child:IsA("Frame") and 1 or nil,
                    TextTransparency = child:IsA("TextLabel") and 1 or nil,
                    ImageTransparency = child:IsA("ImageLabel") and 1 or nil
                }):Play()
            end
        end

        task.wait(0.5)
        screenGui:Destroy()
    end

    return {
        Update = update,
        Finish = finish,
    }
end
