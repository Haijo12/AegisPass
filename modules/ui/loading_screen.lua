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

    -- Dark backdrop
    local backdrop = Instance.new("Frame")
    backdrop.Size = UDim2.new(1, 0, 1, 0)
    backdrop.BackgroundColor3 = Color3.fromRGB(15, 15, 20)
    backdrop.BorderSizePixel = 0
    backdrop.Parent = screenGui

    -- Center card
    local card = Instance.new("Frame")
    card.Size = UDim2.new(0, 320, 0, 180)
    card.Position = UDim2.new(0.5, -160, 0.5, -90)
    card.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
    card.BorderSizePixel = 0
    card.Parent = backdrop

    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = card

    local stroke = Instance.new("UIStroke")
    stroke.Color = Color3.fromRGB(45, 45, 55)
    stroke.Thickness = 1
    stroke.Parent = card

    -- Title
    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, -40, 0, 32)
    title.Position = UDim2.new(0, 20, 0, 28)
    title.BackgroundTransparency = 1
    title.Text = config.ScriptName
    title.TextColor3 = Color3.fromRGB(240, 240, 245)
    title.Font = Enum.Font.GothamBold
    title.TextSize = 24
    title.TextXAlignment = Enum.TextXAlignment.Left
    title.Parent = card

    -- Subtitle (version)
    local version = Instance.new("TextLabel")
    version.Size = UDim2.new(1, -40, 0, 18)
    version.Position = UDim2.new(0, 20, 0, 62)
    version.BackgroundTransparency = 1
    version.Text = "v" .. config.Version
    version.TextColor3 = Color3.fromRGB(140, 140, 150)
    version.Font = Enum.Font.Gotham
    version.TextSize = 14
    version.TextXAlignment = Enum.TextXAlignment.Left
    version.Parent = card

    -- Status line
    local status = Instance.new("TextLabel")
    status.Name = "Status"
    status.Size = UDim2.new(1, -40, 0, 20)
    status.Position = UDim2.new(0, 20, 0, 110)
    status.BackgroundTransparency = 1
    status.Text = "Validating..."
    status.TextColor3 = Color3.fromRGB(180, 180, 190)
    status.Font = Enum.Font.Gotham
    status.TextSize = 14
    status.TextXAlignment = Enum.TextXAlignment.Left
    status.Parent = card

    -- Progress bar background
    local barBg = Instance.new("Frame")
    barBg.Size = UDim2.new(1, -40, 0, 4)
    barBg.Position = UDim2.new(0, 20, 0, 142)
    barBg.BackgroundColor3 = Color3.fromRGB(40, 40, 50)
    barBg.BorderSizePixel = 0
    barBg.Parent = card

    local barBgCorner = Instance.new("UICorner")
    barBgCorner.CornerRadius = UDim.new(1, 0)
    barBgCorner.Parent = barBg

    -- Progress bar fill
    local barFill = Instance.new("Frame")
    barFill.Size = UDim2.new(0, 0, 1, 0)
    barFill.BackgroundColor3 = Color3.fromRGB(0, 170, 255)
    barFill.BorderSizePixel = 0
    barFill.Parent = barBg

    local barFillCorner = Instance.new("UICorner")
    barFillCorner.CornerRadius = UDim.new(1, 0)
    barFillCorner.Parent = barFill

    -- Helper: update status + animate bar
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

    -- Helper: fade out and destroy
    local function finish(finalText, finalColor, success)
        update(finalText, 1, finalColor)
        task.wait(success and 1.2 or 2)

        TweenService:Create(card, TweenInfo.new(0.4, Enum.EasingStyle.Quad), {
            Position = UDim2.new(0.5, -160, 0.5, -70),
            BackgroundTransparency = 1
        }):Play()

        for _, child in ipairs(card:GetDescendants()) do
            if child:IsA("TextLabel") or child:IsA("Frame") then
                TweenService:Create(child, TweenInfo.new(0.3), {
                    BackgroundTransparency = child:IsA("Frame") and 1 or nil,
                    TextTransparency = child:IsA("TextLabel") and 1 or nil
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
