// サーバーから予約データ取得
async function loadReservations() {
    const res = await fetch('reservations.php');
    return await res.json();
}

// サーバーに予約データ保存
async function saveReservations(data) {
    await fetch('reservations.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// FullCalendarの初期化
const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth',
    locale: 'ja',
    events: async function (info, successCallback, failureCallback) {
        const reservations = await loadReservations();
        let events = reservations.map(r => ({
            id: r.id,
            title: `${r.equipment} (${r.user})`,
            start: r.start,
            end: r.end,
            color: r.color,
            extendedProps: { notes: r.notes }
        }));
        successCallback(events);
    },
    eventClick: async function (info) {
        // 予約をクリックしたら削除確認→OKなら削除
        if (confirm("この予約を削除しますか？")) {
            let reservations = await loadReservations();
            const idx = reservations.findIndex(x => x.id === info.event.id);
            if (idx >= 0) {
                reservations.splice(idx, 1);
                await saveReservations(reservations);
                calendar.refetchEvents();
            }
        }
    }
});
calendar.render();
