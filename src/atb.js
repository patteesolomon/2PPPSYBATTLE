class ATB{

    constructor(characterData = '',
    currentATBCharge = 0,
    maxATBCharge = 5,
    stateMachine)
    {
        this.PerformList = new ActionHandler[20]; //ai actions

        this.HeroesInBattle = new Hero[20];

        this.EnemiesInBattle = new Enemy[20];

        this.IBattleState = new currentState();

        this.characterData = this.CharacterData;

        this.currentATBCharge = 0; //in seconds
        this.maxATBCharge = 5; //in seconds
    
        this.stateMachine = CharacterStateMachine;
    
        //state changers
        //reduces the current atb charge by the max * factor. i.e. if you want to reduce the charge to 0, you have a factor of 1. 
    
        //ATBFinishedStateCallback();
    
        //this is assuming there is a multiframe ienumerator action from the action state
    
        this.currentHP = 10;
        this.stats = CharacterStats;
    
        /*
         * Generic Character State Machine Flow
         * 
         * Hero: 
         * ATB Charging -> Selecting State? -> Action State -> ATB Charging -> (dead state)
         * 
         * Enemy:
         * ATB Charging -> Choose Action State -> Action State -> ATB Charging -> (dead state)
         */
    
        this.currentState = ICharacterState;
    
        this.healthPoints = 100; //health value at the beginning of the battle
        this.strength = 10; //how much damage physical attacks do
        this.magic = 10; //how much damage magic attacks do
        this.dexterity = 10; //how likely your attack is to hit 
        this.agility = 10; //how likely an enemy attack is to miss
        this.luck = 10; //how likely an attack is to critical hit
        this.currentHP = 40;
        this.stats = CharacterStats;
    
        this.ATBBar = new Image();
        this.QueuedActions = [100];

    }
    
    Awake()
    {
        stateMachine = new CharacterStateMachine();
        stateMachine = CharacterStateMachine;
    }

    NewStateCallback(newState)
    {        
        stateMachine.ChangeState(newState);
        stateMachine.ChangeState(state);
    }
    //reduces the current atb charge by the max * factor. i.e. if you want to reduce the charge to 0, you have a factor of 1. 
    DecreaseATB(factor = 1)
    {
        currentATBCharge = Clamp(currentATBCharge - (factor * maxATBCharge), 0, maxATBCharge);
        base.DecreaseATB(factor);
        UpdateATBBar();
    }

    SetCurrentATB(newCharge)
    {
        currentATBCharge = newCharge;
    }
    //this is assuming there is a multiframe ienumerator action from the action state
    DoAction(action)
    {
        StartCoroutine(action);
    }

    //instance = null;

    BattleManager()
    {
        //if the instance reference is null, try to find it
        if (instance = null)
        {
            //if its still not found, create it 
        //return instance;
            instance = this.BattleManager(); 
            instance = new BattleManager();
        }
    }
    
    Start()
    {
        HeroesInBattle.AddRange(FindObjectsOfType(Hero));
        for(var i = 1; i < HeroesInBattle.Count; i++)
        {
            HeroesInBattle[i].aiHero = true;
        }
        EnemiesInBattle.AddRange(FindObjectsOfType(Enemy));
        stateMachine.ChangeState(new WaitState());

        //on battle start, create a new charging state
        stateMachine.ChangeState(new ATBChargingState(this));
    }

    AddAction(input)
    {
        PerformList.Add(input);
    }

    HasActionToPerform()
    {
        return PerformList != null && PerformList.Count > 0 ? true : false;
    }

    GetNextAction()
    {
        nextAction = PerformList[0];
        PerformList.RemoveAt(0); //runs in O(n) time. not great, but the action list should never be more than n = 10.
        nextAction = new ActionHandler();
        nextAction.Add(QueuedActions[0]);
        QueuedActions.RemoveAt(0); //runs in O(n) time. not great, but the action list should never be more than n = 10.
        return nextAction;
    }

    Update()
    {
        if (currentState != null)
        {
            currentState.Execute();
        }
    }

    ChangeState(newState = IBattleState)
    {
        Debug.Log("Battle state changed from '" + currentState + "' to '" + newState + "'");
        currentState = newState;
        currentState.Enter();
        Debug.Log("Character state changed from '" + currentState + "' to '" + newState + "'");
        currentState = newState;
        currentState.Enter();
    }

    
    actionH() { return new ActionHandler();}
    // actionH. = this.QueuedActions.length
    //aiHero()

    ATBFinishedStateCallback()
    {
        NewStateCallback(new ChooseActionState(this));
        if (aiHero)
        {
            stateMachine.ChangeState(new ChooseActionState(this));
            return;
        }

        if (QueuedActions.Count > 0)
        {
            stateMachine.ChangeState(new ActionState(GetNextAction()));
        }
        else
        {
            stateMachine.ChangeState(new SelectingState(this));
        }
    }

    //resource access
    GetATBBar()
    {
        return this.ATBBar;
    }

    //reduces the current atb charge by the max * factor. i.e. if you want to reduce the charge to 0, you have a factor of 1.

    setCurrentATB(newCharge)
    {
        base.SetCurrentATB(newCharge);
        UpdateATBBar();
    }

    UpdateATBBar()
    {
        percentCharge = currentATBCharge /  maxATBCharge;
        this.ATBBar.style.transform.localScale = new Vector3(Clamp(percentCharge, 0, 1),
        this.ATBBar.style.transform.localScale.y,
        ATBBar.transform.localScale.z);
    }

    //when atb is done

    SetQueuedAction(action = ActionHandler)
    {
        QueuedActions.Add(action);
        s = SelectingState;
        if(s == stateMachine.currentState)
        {
            stateMachine.ChangeState(new ActionState(GetNextAction()));
        }
    }
}