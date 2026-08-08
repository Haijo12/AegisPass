#!/usr/bin/env python3
import os

def read(path):
    with open(path) as f:
        return f.read()

def func(path, name):
    c = read(path).strip()
    return c.replace('return function', f'local function {name}', 1)

settings = read('script_settings.lua').strip()
if settings.startswith('return '):
    settings = settings[7:]

wl   = read('whitelist_easy.txt')
uw   = func('user_whitelist.lua', 'UserWhitelist')
gw   = func('game_whitelist.lua', 'GameWhitelist')
tr   = func('time_remaining.lua', 'TimeRemaining')
ls   = func('loading_screen.lua', 'LoadingScreen')

template = '''-- AegisPass Bundle — Zero external requests
-- Rebuild: python build.py

local ConfigSettings = {SETTINGS}

local whitelist_easy_text = [=[
{WHITELIST}]=]

local function getTimezoneOffset()
    local t = os.time()
    local utc = os.date("!*t", t)
    local local_ = os.date("*t", t)
    utc.isdst = false; local_.isdst = false
    return os.difftime(os.time(local_), os.time(utc))
end

local function toPHTimestamp(year, month, day, hour)
    if year == "-" or not year then return nil end
    year, month, day, hour = tonumber(year), tonumber(month), tonumber(day), tonumber(hour)
    local localTs = os.time({year=year, month=month, day=day, hour=hour or 0, min=0, sec=0})
    return localTs + getTimezoneOffset() - (8 * 3600)
end

local ConfigWhitelist = {}
local lines = {}
for line in whitelist_easy_text:gmatch("[^\\r\\n]+") do table.insert(lines, line) end

local i = 1
while i <= #lines do
    local line = lines[i]:match("^%s*(.-)%s*$")
    if line ~= "" and not line:match("^%-%-") then
        local tier = line:match("^Tier%s*=%s*(.+)$")
        if tier then
            local entry = {Tier = tier, ExpiresAt = nil, Note = ""}
            i = i + 1
            while i <= #lines do
                local sub = lines[i]:match("^%s*(.-)%s*$")
                if sub == "" then break end
                if not sub:match("^%-%-") then
                    local key, val = sub:match("^(%S+)%s*=%s*(.+)$")
                    if key == "User" then entry.Note = val
                    elseif key == "UserId" then entry.UserId = tonumber(val)
                    elseif key == "Year" then entry._year = val
                    elseif key == "Month" then entry._month = val
                    elseif key == "Day" then entry._day = val
                    elseif key == "Hour" then entry._hour = val
                    end
                end
                i = i + 1
            end
            entry.ExpiresAt = toPHTimestamp(entry._year, entry._month, entry._day, entry._hour)
            entry._year, entry._month, entry._day, entry._hour = nil, nil, nil, nil
            if entry.UserId then ConfigWhitelist[entry.UserId] = entry end
        else
            i = i + 1
        end
    else
        i = i + 1
    end
end

local Config = {
    Settings = ConfigSettings,
    Whitelist = ConfigWhitelist,
    AllowedGames = {},
}

{USER_WL}

{GAME_WL}

{TIME_REM}

local Players = game:GetService("Players")
local MarketplaceService = game:GetService("MarketplaceService")

local function Validate(cfg, whitelist, allowedGames)
    local lp = Players.LocalPlayer
    local r = {
        UserId = lp.UserId, Username = lp.Name, PlaceId = game.PlaceId,
        GameName = "Unknown", IsWhitelisted = false, IsGameAllowed = false,
        Tier = nil, TimeRemaining = nil, TimeColor = nil, CanRun = false,
    }
    pcall(function() r.GameName = MarketplaceService:GetProductInfo(game.PlaceId).Name end)
    r.IsGameAllowed = GameWhitelist(game.PlaceId, allowedGames, cfg.EnableGameWhitelist)
    r.IsWhitelisted, r.Entry = UserWhitelist(lp.UserId, whitelist, cfg.EnableUserWhitelist)
    if r.Entry then
        r.Tier = r.Entry.Tier
        r.TimeRemaining, r.TimeColor = TimeRemaining(r.Entry)
    end
    r.CanRun = r.IsWhitelisted and r.IsGameAllowed
    return r
end

{LOADING}

local AegisPass = {}
function AegisPass:Init()
    local loader = LoadingScreen(Config.Settings)
    loader.Update("Loading configuration...", 0.15)
    loader.Update("Checking whitelist...", 0.4)
    local r = Validate(Config.Settings, Config.Whitelist, Config.AllowedGames)
    loader.Update("Verifying access...", 0.7)
    if not r.CanRun then
        loader.Finish("Access Denied", Color3.fromRGB(255, 70, 70), false)
        warn(Config.Settings.DenyMessage)
        return false, r
    end
    loader.Finish("Welcome, " .. r.Username, Color3.fromRGB(0, 230, 120), true)
    return true, r
end
function AegisPass:AddUser(userId, tier, expiresAt, note)
    Config.Whitelist[userId] = {Tier = tier or "freemium", ExpiresAt = expiresAt, Note = note}
end
function AegisPass:RemoveUser(userId)
    Config.Whitelist[userId] = nil
end
function AegisPass:GetWhitelist()
    return Config.Whitelist
end
AegisPass:Init()
return AegisPass
'''

out = template.replace('{SETTINGS}', settings) \
              .replace('{WHITELIST}', wl) \
              .replace('{USER_WL}', uw) \
              .replace('{GAME_WL}', gw) \
              .replace('{TIME_REM}', tr) \
              .replace('{LOADING}', ls)

with open('aegispass.lua', 'w') as f:
    f.write(out)

sz = os.path.getsize('aegispass.lua')
print(f"✅ aegispass.lua ({sz} bytes) — ZERO external requests")
print("   Execute: loadstring(game:HttpGet('https://raw.githubusercontent.com/Haijo12/AegisPass/main/aegispass.lua'))()")
