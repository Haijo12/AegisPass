return function(window, icons, results)
    local tab = window:CreateTab({name = "Dashboard", icon = icons.shield})

    -- Account group (all static — use paragraphs)
    tab:CreateSection("Account")
    tab:CreateParagraph({title = "Username", content = results.Username})
    tab:CreateParagraph({title = "User ID", content = tostring(results.UserId)})
    tab:CreateParagraph({title = "License", content = (results.Tier or "freemium"):upper()})

    if results.Entry and results.Entry.Note then
        tab:CreateParagraph({title = "Note", content = results.Entry.Note})
    end

    tab:CreateDivider()

    -- Session group (static — use paragraphs)
    tab:CreateSection("Session")
    tab:CreateParagraph({title = "Game", content = results.GameName})
    tab:CreateParagraph({title = "Place ID", content = tostring(results.PlaceId)})

    -- Time is the ONLY dynamic number — Stat is justified here
    if results.TimeRemaining and results.TimeRemaining ~= "Unlimited" then
        tab:CreateDivider()
        tab:CreateSection("Expiration")
        tab:CreateStat({name = "Time Left", value = results.TimeRemaining})
    end

    tab:CreateDivider()

    -- Validation group (static result — paragraph)
    tab:CreateSection("Validation")
    tab:CreateParagraph({
        title = "Access Status",
        content = results.CanRun and "GRANTED" or "REVOKED"
    })

    return tab
end
