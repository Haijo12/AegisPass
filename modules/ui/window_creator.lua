return function(Rayfield, config)
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

    getgenv().AegisPassWindow = window
    return window
end
