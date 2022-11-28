# Cardboard

## To-do's

-

## Storage Structure (Cards)

`cards.json`:

```json
[
  {
    "text": "Card 1",                                main card text            [String]
    "description": "Card Description",               smaller description text  [String]
    "datecreated": 1,                                date created (epoch)      [Integer] 
    "starred": false,                                starred status            [Boolean]
    "url": "https://example.com",                    url associated with card  [String]
    "image": "image.png",                            image file                [String]
    "tags": ["inspiration", "ideas", "favorites"]    list of tags              [Array] [String]
  }
]
```
