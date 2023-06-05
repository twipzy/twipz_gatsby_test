// General
export function exit() {
    fetch('http://highlife/CloseDMVNui', {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({}),
    }).then(resp => resp.json())
}