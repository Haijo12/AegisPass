return function(Rayfield, config)
    -- Destroy old window if it exists
    if getgenv().AegisPassWindow then
        pcall(function() getgenv().AegisPassWindow:Destroy() end)
        getgenv().AegisPassWindow = nil
    end

    local window = Rayfield:CreateWindow({
        name = config.ScriptName,
        subtitle = "v" .. config.Version,
        loadingTitle = config.ScriptName,
        loadingSubtitle = "Validating...",
        theme = "Midnight",
        disableMovement = false,
        disableBuildWarnings = true,
    })

    -- Store reference for anti-duplicate
    getgenv().AegisPassWindow = window

    return window
end
