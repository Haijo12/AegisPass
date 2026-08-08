local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/ui/"

local LoadRayfield      = loadstring(game:HttpGet(BASE_URL .. "rayfield_loader.lua"))()
local BuildTierInfo     = loadstring(game:HttpGet(BASE_URL .. "tier_info.lua"))()
local CreateWindow      = loadstring(game:HttpGet(BASE_URL .. "window_creator.lua"))()
local CreateTags        = loadstring(game:HttpGet(BASE_URL .. "tag_creator.lua"))()
local CreateStatsTab    = loadstring(game:HttpGet(BASE_URL .. "stats_tab.lua"))()
local CreatePurchaseBtn = loadstring(game:HttpGet(BASE_URL .. "purchase_button.lua"))()

local UI = {}
function UI:Show(results, icons, config)
    local Rayfield = LoadRayfield()
    if not Rayfield then return nil end
    local tierInfo = BuildTierInfo(results.Tier or "freemium")
    local window = CreateWindow(Rayfield, config)
    CreateTags(window, results, icons, tierInfo)
    local tab = CreateStatsTab(window, icons, results)
    if not results.CanRun then CreatePurchaseBtn(tab, Rayfield) end
    return window, Rayfield
end
return UI
