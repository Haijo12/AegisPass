local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/ui/"

local LoadRayfield   = loadstring(game:HttpGet(BASE_URL .. "rayfield_loader.lua"))()
local BuildTierInfo  = loadstring(game:HttpGet(BASE_URL .. "tier_info.lua"))()
local CreateWindow   = loadstring(game:HttpGet(BASE_URL .. "window_creator.lua"))()
local CreateTags     = loadstring(game:HttpGet(BASE_URL .. "tag_creator.lua"))()
local CreateStatsTab = loadstring(game:HttpGet(BASE_URL .. "stats_tab.lua"))()

local UI = {}

function UI:Show(results, icons, config)
    local Rayfield = LoadRayfield()
    if not Rayfield then
        return nil
    end

    local tierInfo = BuildTierInfo(results.Tier or "freemium")
    local window = CreateWindow(Rayfield, config)

    CreateTags(window, results, icons, tierInfo)
    CreateStatsTab(window, icons, results)

    return window, Rayfield
end

return UI
