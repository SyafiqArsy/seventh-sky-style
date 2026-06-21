class ProfileAnalysisService:

    @staticmethod
    def calculate_bmi(
        height: float,
        weight: float,
    ) -> float:

        height_meter = height / 100

        bmi = weight / (height_meter ** 2)

        return round(bmi, 2)

    @staticmethod
    def classify_body_type(
        bmi: float,
    ) -> str:

        if bmi < 18.5:
            return "Slim"

        if bmi < 25:
            return "Athletic"

        if bmi < 30:
            return "Regular"

        return "Heavy"