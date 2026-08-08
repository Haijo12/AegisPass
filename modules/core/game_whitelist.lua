return function(placeId, allowedGames, enabled)
    if not enabled then return true end
    if #allowedGames == 0 then return true end
    for _, id in ipairs(allowedGames) do if id == placeId then return true end end
    return false
end
