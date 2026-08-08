return function(Rayfield, config)
    if getgenv().AegisPassWindow then
        pcall(function() getgenv().AegisPassWindow:Destroy() end)
        getgenv().AegisPassWindow = nil
    end

    local window = Rayfield:CreateWindow({
        name = config.ScriptName,
        subtitle = "v" .. config.Version,
        theme = "midnight",        -- lowercase (snippet confirms)
        disableMovement = false,
        disableBuildWarnings = true,
    })

    getgenv().AegisPassWindow = window
    return window
end
