return function(window, icons, results)
    local tab = window:CreateTab({name = "Dashboard", icon = icons.shield})

    -- Group: Account (static info, combined into fewer stats)
    tab:CreateStat({name = "Account", value = results.Username .. "  |  " .. results.UserId})
    tab:CreateStat({name = "License", value = (results.Tier or "freemium"):upper()})

    if results.Entry and results.Entry.Note then
        tab:CreateStat({name = "Note", value = results.Entry.Note})
    end

    tab:CreateDivider()

    -- Group: Session (static info)
    tab:CreateStat({name = "Game", value = results.GameName .. "  |  " .. results.PlaceId})

    tab:CreateDivider()

    -- Group: Expiration
    -- Time Left is the ONLY dynamic number — Stat justified here
    if results.TimeRemaining then
        tab:CreateStat({name = "Time Left", value = results.TimeRemaining})
    end

    tab:CreateDivider()

    -- Group: Result
    tab:CreateStat({name = "Status", value = results.CanRun and "GRANTED" or "REVOKED"})

    return tab
end
