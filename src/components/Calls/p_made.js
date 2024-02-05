let p_made = false;

function set_p(v)
{
    p_made = v;
}

function get_p(){
    return p_made;
}

export {get_p, set_p};