return function()
    local ok, Rayfield = pcall(function() return loadstring(game:HttpGet("https://sirius.menu/gen2"))() end)
    if not ok then warn("[AegisPass] Rayfield failed to load"); return nil end
    return Rayfield
end
