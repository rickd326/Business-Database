import PySimpleGUI as sg

# Define the window's contents
layout = [
    [sg.Text("Customer Name"), sg.InputText(key='-NAME-')],
    [sg.Text("Customer Email"), sg.InputText(key='-EMAIL-')],
    [sg.Button('Add'), sg.Button('Update'), sg.Button('Delete')],
    [sg.Listbox(values=[], size=(40, 20), key='-CUSTOMER LIST-')],
]

# Create the window
window = sg.Window('Customer Management', layout)

# Display and interact with the Window
while True:
    event, values = window.read()
    if event == sg.WINDOW_CLOSED:
        break
    elif event == 'Add':
        # Add customer logic
        pass
    elif event == 'Update':
        # Update customer logic
        pass
    elif event == 'Delete':
        # Delete customer logic
        pass

# Finish up by removing from the screen
window.close()
