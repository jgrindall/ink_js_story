VAR name = "John"

Once upon a time6...
#{"effects": ["left"], "classNames": ["red"], "images": ["1.png", "2.png"]}
#{"a": 1}

Once upon a time6...
#{"comment": "comment3"}

He turned to me. "What should we eat, {name}?"

Once upon a time6...
#{"comment": "comment3"}


 * [Choice a] -> a
 * [Choice b] Hello -> b 
 * And another -> c


== a ==

This is a
#{"comment": "comment3"}

This is also a

 * [This goes to b] -> b
 * [To c] And another -> c


== b ==
This is b
This is also b
-> end


== c ==
This is c
This is also c
-> end



== end ==

- They lived happily ever after.
    -> END


=== function changeName(newName) ===
 ~ name = newName
 
 



