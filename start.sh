
cd backend/
rails s --binding=0.0.0.0
rails server &

cd ../frontend/
pnpm start &

read -p "Press any key to stop..."