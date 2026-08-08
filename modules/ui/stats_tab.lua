return function(window, icons, results)
    local tab = window:CreateTab({ name = "Dashboard", icon = icons.shield })

    -- Account Section — grouped side-by-side to reduce stat clutter
    tab:CreateSection({ name = "Account", icon = icons.license[results.Tier or "freemium"] })

    local accountRow = tab:CreateGroup({ direction = "row" })
    accountRow:CreateStat({ name = "User", value = results.Username .. "  |  " .. results.UserId })
    accountRow:CreateStat({ name = "License", value = (results.Tier or "freemium"):upper() })

    if results.Entry and results.Entry.Note then
        tab:CreateStat({ name = "Note", value = results.Entry.Note })
    end

    tab:CreateDivider()

    -- Session Section — grouped side-by-side
    tab:CreateSection({ name = "Session", icon = icons.shield })

    local sessionRow = tab:CreateGroup({ direction = "row" })
    sessionRow:CreateStat({ name = "Game", value = results.GameName })
    sessionRow:CreateStat({ name = "Place ID", value = tostring(results.PlaceId) })

    tab:CreateDivider()

    -- Expiration — only if limited time. Time Left is the ONLY dynamic value → Stat justified
    if results.TimeRemaining and results.TimeRemaining ~= "Unlimited" then
        tab:CreateSection({ name = "Expiration", icon = icons.time })
        tab:CreateStat({ name = "Time Left", value = results.TimeRemaining })
        tab:CreateDivider()
    end

    -- Validation Section — final result
    local statusIcon = results.CanRun and icons.status.authorized or icons.status.denied
    tab:CreateSection({ name = "Validation", icon = statusIcon })
    tab:CreateStat({ name = "Access", value = results.CanRun and "GRANTED" or "REVOKED" })

    return tab
end
