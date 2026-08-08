local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/config/"

return {
    Settings     = loadstring(game:HttpGet(BASE_URL .. "script_settings.lua"))(),
    Whitelist    = loadstring(game:HttpGet(BASE_URL .. "whitelist_data.lua"))(),
    AllowedGames = loadstring(game:HttpGet(BASE_URL .. "allowed_games.lua"))(),
}
