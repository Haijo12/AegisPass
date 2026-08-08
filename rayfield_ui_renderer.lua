--[[ UI.lua ]]
local UI = {}

function UI:Show(results, icons, config)
    local ok, Rayfield = pcall(function()
        return loadstring(game:HttpGet("https://sirius.menu/gen2"))()
    end)
    if not ok then warn("[AegisPass] Rayfield failed"); return nil end
    
    local tierColors = {
        premium = Color3.fromRGB(255, 215, 0),
        lifetime = Color3.fromRGB(180, 100, 255),
        dev = Color3.fromRGB(0, 200, 255),
        freemium = Color3.fromRGB(150, 150, 150),
    }
    local tierLabels = {premium = "Premium", lifetime = "Lifetime", dev = "Dev", freemium = "Freemium"}
    local tier = results.Tier or "freemium"
    local tierInfo = {
        Label = tierLabels[tier] or "Freemium",
        Color = tierColors[tier] or Color3.fromRGB(150, 150, 150),
    }
    
    -- Midnight = dark night theme
    local w = Rayfield:CreateWindow({
        Name = config.ScriptName,
        Subtitle = "v" .. config.Version,
        LoadingTitle = config.ScriptName,
        LoadingSubtitle = "Validating...",
        Theme = "Midnight",
        DisableMovement = false,
        DisableBuildWarnings = true,
    })
    
    -- Tag 1: Status
    w:CreateTag({
        text = results.CanRun and "AUTHORIZED" or "DENIED",
        icon = results.CanRun and icons.status.authorized or icons.status.denied,
        color = results.CanRun and Color3.fromRGB(0, 255, 100) or Color3.fromRGB(255, 50, 50),
        order = 1,
    })
    
    -- Tag 2: License
    w:CreateTag({
        text = tierInfo.Label,
        icon = icons.license[tier] or icons.license.freemium,
        color = tierInfo.Color,
        order = 2,
    })
    
    -- Tag 3: Time Left
    if results.TimeRemaining then
        w:CreateTag({
            text = results.TimeRemaining,
            icon = icons.time,
            color = results.TimeColor,
            order = 3,
        })
    end
    
    -- Tab with shield icon (number)
    local tab = w:CreateTab({Name = "Access", Icon = icons.shield})
    
    tab:CreateStat({Name = "User", Value = results.Username .. " (" .. results.UserId .. ")"})
    tab:CreateStat({Name = "Game", Value = results.GameName .. " (" .. results.PlaceId .. ")"})
    tab:CreateStat({Name = "User Check", Value = results.IsWhitelisted and "PASS" or "FAIL"})
    tab:CreateStat({Name = "Game Check", Value = results.IsGameAllowed and "PASS" or "FAIL"})
    
    if results.Entry and results.Entry.Note then
        tab:CreateStat({Name = "Note", Value = results.Entry.Note})
    end
    
    if not results.CanRun then
        tab:CreateDivider()
        tab:CreateButton({
            Name = "Purchase Access",
            Callback = function()
                Rayfield:Notify({Title = "AegisPass", Content = "Contact the script owner.", Duration = 5})
            end,
        })
    end
    
    return w, Rayfield
end

return UI
