{
    "id": 5,
    "formulaName": "monster_stat",
    "luaFormula": 
    "function params()
        return {\"monster_level\", \"stat_ratio\", \"stat_base\"}
    end
    
    function main()
        if stat_ratio == nil then
            return 0
        end
        
        return math.floor(7 + (math.pow(monster_level, 1.26) * stat_ratio))
    end"
}

-- Formule finale: [Tronqué](7 + ((niveau)^1,26)*[RATIO])
-- (7+(312^1,26)* )
-- 0.9305 ?