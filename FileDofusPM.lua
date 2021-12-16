{
    "id": 3,
    "formulaName": "monster_pm",
    "luaFormula": 

    "function params()
        return {\"monster_level\", \"monster_grade_hidden_level\", \"stat_base\", \"monster_grade_level\"}
    end
    
    function main()
        --By pass for monsters with 0 pm remains 0 pm : no scale but remains boostable, -1pm remains -1pm : no scale, no boostable)
        if stat_base == -1 then
        return stat_base
    end
    local original_lvl;
    
    if monster_grade_hidden_level == 0 then
        original_lvl = monster_grade_level
    else
        original_lvl = monster_grade_hidden_level
    end
    
    return stat_base + math.floor(math.pow((monster_level - original_lvl) / 70 , 0.77))
        -- return stat_base + math.floor(monster_level/100)
    end"
}

-- Formule finale: Pm_base+[Tronqué](((niveau-niveau_base)/70)^0,77)