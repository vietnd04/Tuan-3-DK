<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
 
    public function index()
    {
        return response()->json(Task::all());
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $task = Task::create([
            'title' => $request->title,
            'completed' => $request->completed ?? false
        ]);

        return response()->json($task, 201);
    }


    public function show(Task $task)
    {
        return response()->json($task);
    }


    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255'
        ]);

        $task->update($request->all());

        return response()->json($task);
    }


    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
