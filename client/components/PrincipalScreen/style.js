export default {
    container: {
        /* backgroundColor: 'yellow', */
    },
    headerAmount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 100,
    },
    balanceContainer: {
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40

    },
    amount: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
    },
    amountDescription: {
        textAlign: 'center',
        color: 'white'
    },
    userImage: {
        backgroundColor: 'black',
        width: 70,
        height: 70,
        borderRadius: 35
    },
    generalContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

    },
    titleGeneral: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 10
    },
    amountGeneral: {
        fontSize: 20  
    },
    columnAmount: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    amountsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonsContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    button: {
        flexDirection: 'column',
        height: 55,
        borderRadius: 5,
        margin: 4,
        marginTop: -15,
        marginBottom: -20,
        width: 81,
        backgroundColor: 'white'
    },
    secondaryButton: {
        flexDirection: 'column',
        height: 55,
        borderRadius: 5,
        margin: 4,
        marginTop: -15,
        width: 170,
        backgroundColor: 'white'
    },
    textOption: {
        fontSize: 11
    }

}