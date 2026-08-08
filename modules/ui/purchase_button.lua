return function(tab, Rayfield)
    tab:CreateDivider()
    tab:CreateButton({Name = "Purchase Access", Callback = function()
        Rayfield:Notify({Title = "AegisPass", Content = "Contact the script owner.", Duration = 5})
    end})
end
