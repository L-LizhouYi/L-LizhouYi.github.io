// 目标元素
const targetElement = document.querySelector(".archives");

// 插入新的 HTML 代码
const newHTML = `
<section class="widget mastodon-widget">
    <div class="widget-icon">
        <object data="/mastodon.svg" type="image/svg+xml" class=""></object>
    </div>
    <h2 class="widget-title section-title">动态</h2>
    <div id="widget-mastodon--list" class="widget-mastodon--list">
        <div class="main" id="Rep">
            <div class="item">
                <div class="content">
                    <p>正在加载...</p>
                </div>
            </div>
        </div>
    </div>
</section>`;

targetElement.insertAdjacentHTML("beforebegin", newHTML);

// 处理响应数据
const handleResponseData = (data) => {
    const { content, created_at } = data[0];
    const formattedTime = new Date(created_at).toLocaleString();

    const htmlStencil = `
        <div class="item">
            <div class="content">
                ${content}
            </div>
            <div class="time">
                ${formattedTime}
            </div>
        </div>
    `;

    const originalElement = document.getElementById('Rep');
    originalElement.innerHTML = htmlStencil;
};

// 请求数据
const domain = "cmx.0500000.xyz";
const uid = "110665658065462475";
const httpUrl = `https://${domain}/api/v1/accounts/${uid}/statuses?limit=1%20||%20%27%27`;

fetch(httpUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not OK');
    })
    .then(handleResponseData)
    .catch(error => {
        console.log('Error:', error);
    });