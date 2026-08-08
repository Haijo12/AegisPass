return function(window, icons, results)
    local tab = window:CreateTab({Name = "Dashboard", Icon = icons.shield})

    -- Account group
    tab:CreateStat({Name = "User", Value = results.Username .. " (" .. results.UserId .. ")"})
    tab:CreateStat({Name = "License", Value = (results.Tier or "freemium"):upper()})

    if results.TimeRemaining then
        tab:CreateStat({Name = "Time Left", Value = results.TimeRemaining})
    end

    if results.Entry and results.Entry.Note then
        tab:CreateStat({Name = "Note", Value = results.Entry.Note})
    end

    tab:CreateDivider()

    -- Session group
    tab:CreateStat({Name = "Game", Value = results.GameName .. " (" .. results.PlaceId .. ")"})
    tab:CreateStat({Name = "Status", Value = results.CanRun and "GRANTED" or "REVOKED"})

    return tab
end
