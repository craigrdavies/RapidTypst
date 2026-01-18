# Rapid Typst - Start Script
Write-Host "Starting Rapid Typst..." -ForegroundColor Cyan

# Create MongoDB data directory
if (!(Test-Path "C:\data\db")) {
    New-Item -ItemType Directory -Path "C:\data\db" -Force | Out-Null
    Write-Host "Created C:\data\db" -ForegroundColor Yellow
}

# Start MongoDB in new window
Write-Host "Starting MongoDB..." -ForegroundColor Green
Start-Process -FilePath "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" -ArgumentList "--dbpath", "C:\data\db"
Start-Sleep -Seconds 3

# Start Backend in new window
Write-Host "Starting Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Projects\RapidTypst\backend; .\venv\Scripts\Activate.ps1; python -m uvicorn server:app --reload --host 0.0.0.0 --port 8001"
Start-Sleep -Seconds 2

# Start Frontend in new window  
Write-Host "Starting Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Projects\RapidTypst\frontend; npm start"

Write-Host ""
Write-Host "All services starting!" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:8001" -ForegroundColor White
Write-Host ""
