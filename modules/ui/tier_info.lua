return function(tier)
    local colors = {premium = Color3.fromRGB(255, 215, 0), lifetime = Color3.fromRGB(180, 100, 255), dev = Color3.fromRGB(0, 200, 255), freemium = Color3.fromRGB(150, 150, 150)}
    local labels = {premium = "Premium", lifetime = "Lifetime", dev = "Dev", freemium = "Freemium"}
    return {Label = labels[tier] or "Freemium", Color = colors[tier] or Color3.fromRGB(150, 150, 150)}
end
