return function(entry)
    if not entry or not entry.ExpiresAt then return "Unlimited", Color3.fromRGB(0, 255, 136) end
    local remaining = entry.ExpiresAt - os.time()
    if remaining <= 0 then return "Expired", Color3.fromRGB(255, 50, 50) end
    local days = math.floor(remaining / 86400); remaining = remaining % 86400
    local hours = math.floor(remaining / 3600); remaining = remaining % 3600
    local minutes = math.floor(remaining / 60)
    local text = days > 0 and string.format("%dd %dh %dm", days, hours, minutes) or hours > 0 and string.format("%dh %dm", hours, minutes) or string.format("%dm", minutes)
    local color = Color3.fromRGB(0, 255, 136)
    if days == 0 and hours < 1 then color = Color3.fromRGB(255, 50, 50)
    elseif days == 0 then color = Color3.fromRGB(255, 150, 0)
    elseif days <= 3 then color = Color3.fromRGB(255, 200, 0) end
    return text, color
end
