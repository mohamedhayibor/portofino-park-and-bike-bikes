# portofino-park-and-bike-bikes ![](https://img.shields.io/badge/status-stable-green.svg)

This module is a command line tool that gets you the real-time info on stations. Particularly the number of bikes available for rent and the number of available docks.

## Installation
```sh
  > npm install -g portofino-park-and-bike-bikes
```

> Don't forget the "-g" to install it globally. (then you can run the `bikes` command anywhere)

## Usage

On your terminal:
```sh
  > bikes `station-id`
```
Basically the bikes command and whatever station you want to check.

At first, you will obviously not know the id of a particular station. Run the command this command below to the list of all stations ids and names:
```sh
  > bikes
```
You can get that with the command `bikes`. It is a deliberate api design decision. The reality is that you most frequently use only 3 to 4 stations anyways. By your fourth use, you will know the id by heart (one or two digits). Then you can pretty much make the query in less a second. (Will save you a lot of time).

#### Api

No api to mess with. Enter the command `bikes` and the `station-id` and get an instant update (number of bikes and docks available). Enter `bikes` only to get the updated list of stations ids and name.

> few lines of code.

## License
MIT © [Mohamed Hayibor](https://github.com/mohamedhayibor)
