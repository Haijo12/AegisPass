local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/core/"

local Core = {}
Core.Validate = loadstring(game:HttpGet(BASE_URL .. "validator.lua"))()
return Core
