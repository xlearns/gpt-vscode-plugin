import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-demo" is now active!');

    // 注册一个名为 "vscode-demo.test" 的命令
    const disposable = vscode.commands.registerCommand('vscode-demo.vsplugin-test', () => {
        // 获取当前活动的编辑器
        const activeEditor = vscode.window.activeTextEditor;

        if (activeEditor) {
            // 获取当前编辑器所显示的文本内容
            const document = activeEditor.document;
            const docStr = document.getText()

            // 定义将要替换的文本范围以及替换的内容
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(docStr.length)
            );
            const edit = activeEditor.edit(editBuilder => {
                editBuilder.replace(fullRange, 'hello world');
            });

            // 应用更新
            edit.then(success => {
                console.log('Text replaced successfully');
            }, error => {
                console.log('Error during text replacement:', error);
            });
        }

        // 在界面上显示 "Hello World"
        vscode.window.showInformationMessage('Hello World from !');
    });

    // 将注册的命令添加到插件的上下文中，以便在后续进行取消注册
    context.subscriptions.push(disposable);
}

export function deactivate() {}