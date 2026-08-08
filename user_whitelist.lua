return function(userId, whitelist, enabled)
    if not enabled then return true, {Tier = "freemium"} end
    local entry = whitelist[userId]
    if not entry then return false, nil end
    if entry.ExpiresAt and os.time() > entry.ExpiresAt then return false, entry end
    return true, entry
end
