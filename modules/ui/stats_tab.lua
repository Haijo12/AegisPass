return function(window, icons, results)
    local tab = window:CreateTab({name = "Dashboard", icon = "shield"})

    -- Account Group
    local accountGroup = tab:CreateGroup({name = "Account", icon = "user"})
    accountGroup:CreateLabel({name = "Username", text = results.Username, icon = "user"})
    accountGroup:CreateLabel({name = "User ID", text = tostring(results.UserId), icon = "hash"})
    accountGroup:CreateLabel({name = "License", text = (results.Tier or "freemium"):upper(), icon = "award"})

    if results.Entry and results.Entry.Note then
        accountGroup:CreateLabel({name = "Note", text = results.Entry.Note, icon = "sticky-note"})
    end

    tab:CreateDivider()

    -- Session Group
    local sessionGroup = tab:CreateGroup({name = "Session", icon = "gamepad-2"})
    sessionGroup:CreateLabel({name = "Game", text = results.GameName, icon = "globe"})
    sessionGroup:CreateLabel({name = "Place ID", text = tostring(results.PlaceId), icon = "map-pin"})

    -- Expiration Group (only if limited time)
    if results.TimeRemaining and results.TimeRemaining ~= "Unlimited" then
        tab:CreateDivider()
        local expireGroup = tab:CreateGroup({name = "Expiration", icon = "hourglass"})
        expireGroup:CreateLabel({name = "Time Left", text = results.TimeRemaining, icon = "clock"})
    end

    tab:CreateDivider()

    -- Validation Group
    local valIcon = results.CanRun and "shield-check" or "shield-x"
    local valColor = results.CanRun and Color3.fromRGB(0, 255, 100) or Color3.fromRGB(255, 50, 50)
    local valGroup = tab:CreateGroup({name = "Validation", icon = valIcon})
    valGroup:CreateLabel({
        name = "Access",
        text = results.CanRun and "GRANTED" or "REVOKED",
        color = valColor,
        icon = results.CanRun and "check-circle" or "x-circle",
    })

    return tab
end
