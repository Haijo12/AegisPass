return function(window, icons, results)
    local tab = window:CreateTab({Name = "Access", Icon = icons.shield})
    tab:CreateStat({Name = "User", Value = results.Username .. " (" .. results.UserId .. ")"})
    tab:CreateStat({Name = "Game", Value = results.GameName .. " (" .. results.PlaceId .. ")"})
    tab:CreateStat({Name = "User Check", Value = results.IsWhitelisted and "PASS" or "FAIL"})
    tab:CreateStat({Name = "Game Check", Value = results.IsGameAllowed and "PASS" or "FAIL"})
    if results.Entry and results.Entry.Note then tab:CreateStat({Name = "Note", Value = results.Entry.Note}) end
    return tab
end
