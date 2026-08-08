return function(Rayfield, config)
    return Rayfield:CreateWindow({
        Name = config.ScriptName,
        Subtitle = "v" .. config.Version,
        LoadingTitle = config.ScriptName,
        LoadingSubtitle = "Validating...",
        Theme = "Midnight",
        DisableMovement = false,
        DisableBuildWarnings = true,
    })
end
