local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/config/"
local raw = game:HttpGet(BASE_URL .. "whitelist_easy.txt")

local whitelist = {}

local function getTimezoneOffset()
    local localTime = os.time()
    local utcTime = os.time(os.date("!*t", localTime))
    return os.difftime(localTime, utcTime)
end

local function toPHTimestamp(year, month, day, hour)
    if year == "-" or not year then return nil end
    year, month, day, hour = tonumber(year), tonumber(month), tonumber(day), tonumber(hour)
    local localTs = os.time({year=year, month=month, day=day, hour=hour or 0, min=0, sec=0})
    local localOffset = getTimezoneOffset()
    return localTs - localOffset + (8 * 3600)
end

for line in raw:gmatch("[^\r\n]+") do
    line = line:match("^%s*(.-)%s*$")
    if line ~= "" and not line:match("^%-%-") then
        local tier, username, userId, year, month, day, hour = line:match("^(%S+)%s+(%S+)%s+(%S+)%s+(%S+)%s+(%S+)%s+(%S+)%s+(%S+)$")
        if tier and userId then
            userId = tonumber(userId)
            whitelist[userId] = {
                Tier = tier,
                ExpiresAt = toPHTimestamp(year, month, day, hour),
                Note = username,
            }
        end
    end
end

return whitelist
