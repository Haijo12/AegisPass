local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/config/"
local raw = game:HttpGet(BASE_URL .. "whitelist_easy.txt")

local whitelist = {}

local function getTimezoneOffset()
    local t = os.time()
    local utc = os.date("!*t", t)
    local local_ = os.date("*t", t)
    utc.isdst = false
    local_.isdst = false
    return os.difftime(os.time(local_), os.time(utc))
end

local function toPHTimestamp(year, month, day, hour)
    if year == "-" or not year then return nil end
    year, month, day, hour = tonumber(year), tonumber(month), tonumber(day), tonumber(hour)
    local localTs = os.time({year=year, month=month, day=day, hour=hour or 0, min=0, sec=0})
    local localOffset = getTimezoneOffset()
    -- Input is PH time (UTC+8). Convert to UTC timestamp.
    return localTs + localOffset - (8 * 3600)
end

local lines = {}
for line in raw:gmatch("[^\r\n]+") do
    table.insert(lines, line)
end

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
                if sub:match("^%-%-") then i = i + 1; goto skip end
                
                local key, val = sub:match("^(%S+)%s*=%s*(.+)$")
                if key == "User" then
                    entry.Note = val
                elseif key == "UserId" then
                    entry.UserId = tonumber(val)
                elseif key == "ExpiryDate:" then
                    -- header, nothing
                elseif key == "Year" then
                    entry._year = val
                elseif key == "Month" then
                    entry._month = val
                elseif key == "Day" then
                    entry._day = val
                elseif key == "Hour" then
                    entry._hour = val
                end
                
                ::skip::
                i = i + 1
            end
            
            entry.ExpiresAt = toPHTimestamp(entry._year, entry._month, entry._day, entry._hour)
            entry._year, entry._month, entry._day, entry._hour = nil, nil, nil, nil
            
            if entry.UserId then
                whitelist[entry.UserId] = entry
            end
        else
            i = i + 1
        end
    else
        i = i + 1
    end
end

return whitelist
