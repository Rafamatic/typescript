import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
figlet('TODOLIST!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.green(data));
});
let todolist = [];
async function Repeat() {
    const answer = await inquirer.prompt([{
            name: "repeat",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want another operation?"
        }]);
    return (answer.repeat == "Yes") ? true : false;
}
async function ToDoList() {
    let startAgain = true;
    do {
        const answer = await inquirer.prompt([{
                name: "option",
                type: "list",
                choices: ["Add Item", "Display Item", "Remove Item"],
                message: "What you want to do?"
            }]);
        if (answer.option == "Add Item") {
            const item = await inquirer.prompt([{
                    name: "newItem",
                    type: "input",
                    message: "Enter new Item"
                }]);
            todolist.push(item.newItem);
            startAgain = await Repeat();
        }
        else if (answer.option == "Display Item") {
            if (todolist.length === 0) {
                console.log(chalk.red("Empty"));
            }
            todolist.forEach(element => console.log(element));
            startAgain = await Repeat();
        }
        else if (answer.option == "Remove Item") {
            if (todolist.length === 0) {
                console.log(chalk.red("Empty"));
            }
            let removeItem = await inquirer.prompt([{
                    name: "item",
                    type: "input",
                    message: "Whic one you want to remove?"
                }]);
            let index = todolist.indexOf(removeItem.item);
            if (index !== -1) {
                todolist.splice(index, 1);
            }
            startAgain = await Repeat();
        }
    } while (startAgain !== false);
}
setTimeout(() => {
    ToDoList();
}, 1000);
;
