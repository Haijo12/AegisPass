return function(entry)
    if not entry or not entry.ExpiresAt then
        return "Unlimited", nil
    end

    local now = os.time()
    if now > entry.ExpiresAt then
        return "Expired", nil
    end

    -- PH Time = UTC+8 (add 28800 seconds)
    local PH_OFFSET = 8 * 3600
    local phTime = os.date("!*t", entry.ExpiresAt + PH_OFFSET)

    local months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}

    local text = string.format(
        "%s %d, %d at %02d:%02d PH Time",
        months[phTime.month],
        phTime.day,
        phTime.year,
        phTime.hour,
        phTime.min
    )

    return text, nil
end
