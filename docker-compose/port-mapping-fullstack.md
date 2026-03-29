## Port Mapping — Understanding

### Example

    ports:
      - "8080:3000"

### Breakdown

    Host Port      → 8080
    Container Port → 3000
    App Port       → 3000

### Flow

    Browser → localhost:8080
            ↓
    Container → 3000
            ↓
    React App → 3000

### Rule

    container port must match app port
    host port can be anything free

### Failure Case

    ports:
      - "8000:3000"

    app.listen(4000)

    Result:
    request reaches container:3000
    no app listening → no response