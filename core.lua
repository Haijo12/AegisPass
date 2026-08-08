local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/core/"

local Core = {}

Core.IsWhitelisted    = loadstring(game:HttpGet(BASE_URL .. "user_whitelist.lua"))()
Core.IsGameAllowed    = loadstring(game:HttpGet(BASE_URL .. "game_whitelist.lua"))()
Core.GetTimeRemaining = loadstring(game:HttpGet(BASE_URL .. "time_remaining.lua"))()
Core.Validate         = loadstring(game:HttpGet(BASE_URL .. "validator.lua"))()

return Core
