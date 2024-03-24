import socketio

sio_server = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=[]
)

sio_app = socketio.ASGIApp(
    socketio_server=sio_server,
    socketio_path='sockets'
)


@sio_server.event
async def connect(sid, environ, auth):
    print(f'{sid}: connected')
    await sio_server.emit('join', {'sid': sid})


# @sio_server.event
# async def chat(sid, message):
#     await sio_server.emit('chat', {'sid': sid, 'message': message})
    
@sio_server.event
async def chat(sid, data):
    message = data.get('message')
    file_data = data.get('file')
    
    if file_data:
        # Process file data here (save to disk, etc.)
        # For demonstration, let's print the file information
        print("Received file:", file_data)
    
    await sio_server.emit('chat', {'sid': sid, 'message': message})


@sio_server.event
async def disconnect(sid):
    print(f'{sid}: disconnected')

