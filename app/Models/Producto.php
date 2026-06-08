<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use HasFactory;

class Producto extends Model
{
    protected $fillable = ['nombre', 'descripcion', 'precio', 'stock', 'imagen'];
}
