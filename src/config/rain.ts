interface Rain {
    days: Record<number, number>
    mm?: Record<number, number>
}

export const rainByCountryMonth: Record<string, Rain> = {
    Colombia: {
        days: {
            8: 9.2,
            9: 13,
            10: 19,
            11: 17,
            12: 13,
            1: 11,
            2: 13,
            3: 15
        }
    },
    Peru: {
        days: {
            8: 18,
            9: 16,
            10: 17,
            11: 15,
            12: 25,
            1: 18,
            2: 27,
            3: 22
        },
        mm: {
            8: 47,
            9: 62,
            10: 85,
            11: 96,
            12: 112,
            1: 122,
            2: 131,
            3: 126
        }
    },
    Argentina: {
        days: {
            8: 4,
            9: 4,
            10: 4,
            11: 5,
            12: 6,
            1: 8,
            2: 7,
            3: 7
        }
    },
    Uruguay: {
        days: {
            8: 6,
            9: 7,
            10: 6,
            11: 6,
            12: 5,
            1: 6,
            2: 7,
            3: 6
        }
    },
    Chile: {
        days: {
            8: 7,
            9: 6,
            10: 3,
            11: 2,
            12: 1,
            1: 0,
            2: 1,
            3: 2
        }
    },
    Bolivia: {
        days: {
            8: 4,
            9: 7,
            10: 11,
            11: 13,
            12: 17,
            1: 22,
            2: 17,
            3: 16
        }
    },
    Ecuador: {
        days: {
            8: 6,
            9: 11,
            10: 15,
            11: 16,
            12: 15,
            1: 13,
            2: 13,
            3: 18
        }
    },
    Brazil: {
        days: {
            8: 8,
            9: 27,
            10: 8,
            11: 27,
            12: 11,
            1: 10,
            2: 12,
            3: 12
        }
    }
}
