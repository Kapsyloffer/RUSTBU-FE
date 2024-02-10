function fetch_previous_moves(url){

const packet2 = {
    type: "PreviousMoves",
    url: url,
};
ws.send(JSON.stringify(packet2));  

/*TODO: 
- Fetch prev moves.
- Read the response.
- Parse and add to a class.
- Display the moves.
*/
}