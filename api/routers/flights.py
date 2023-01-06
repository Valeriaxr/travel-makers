from fastapi import APIRouter



router = APIRouter()


@router.post("/flights")
def create_flight():
    pass
