return function(window, results, icons, tierInfo)
    window:CreateTag({
        text = results.CanRun and "AUTHORIZED" or "DENIED",
        icon = results.CanRun and icons.status.authorized or icons.status.denied,
        color = results.CanRun and Color3.fromRGB(0, 255, 100) or Color3.fromRGB(255, 50, 50),
        order = 1,
    })

    local tagText = tierInfo.Label
    if results.TimeRemaining and results.TimeRemaining ~= "Unlimited" then
        tagText = tierInfo.Label .. "  •  " .. results.TimeRemaining
    end

    window:CreateTag({
        text = tagText,
        icon = icons.license[results.Tier or "freemium"] or icons.license.freemium,
        color = tierInfo.Color,
        order = 2,
    })
end
