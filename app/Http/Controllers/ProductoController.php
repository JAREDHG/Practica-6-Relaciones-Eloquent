<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Resources\ProductoResource;

class ProductoController extends Controller
{
    public function index()
    {
        // Retornamos el recurso como colección
        return ProductoResource::collection(Producto::paginate(9));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'  => 'required|string',
            'precio'  => 'required|numeric',
            'imagen'  => 'nullable|image|mimes:jpg,png,webp|max:2048',
        ]);

        $data = $request->except('imagen');

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('productos', 'public');
        }

        $producto = Producto::create($data);
        return new ProductoResource($producto);
    }

    public function show(Producto $producto)
    {
        return new ProductoResource($producto);
    }

    public function update(Request $request, Producto $producto)
    {
        
        $request->validate([
            'nombre'  => 'sometimes|string',
            'precio'  => 'sometimes|numeric',
            'stock' => 'sometimes|numeric',
            'imagen'  => 'nullable|image|mimes:jpg,png,webp|max:2048',
        ]);

        $data = $request->only(['nombre', 'descripcion', 'precio', 'stock']);

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('productos', 'public');
        }

        $producto->update($data);
        return new ProductoResource($producto);
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->json(null, 204);
    }
}