// https://thewolfkit.com
export function TheWolfKit(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="currentColor" {...props}>
			<path
				clipRule="evenodd"
				d="M34.3001 47.3369L34.5275 44.1512C34.5275 44.1512 44.0185 48.2207 44.6132 48.483C46.0274 49.1071 47.4338 49.7502 48.8464 50.3778C49.1625 50.5184 49.4458 50.4028 49.4837 50.051C49.5373 49.5546 49.4837 48.5405 49.4837 48.5405C49.4837 48.5405 45.9535 44.4877 45.5025 43.8446C45.3881 43.6815 45.4012 43.4995 45.6353 43.4082C46.2091 43.1847 52.5756 42.7963 52.7826 42.8652C52.9896 42.9341 52.9605 43.1019 52.9258 43.2156C52.7583 43.7617 50.2222 48.6637 50.2222 48.6637C50.2222 48.6637 50.1581 49.5147 50.1433 49.9429C50.1323 50.2533 50.3559 50.403 50.6395 50.282C50.7869 50.2194 53.1755 48.483 53.3747 47.8904C53.5738 47.2979 53.9654 44.6438 53.8119 43.6815C53.6584 42.7193 52.8295 41.5883 52.5238 41.2378C51.6831 40.2737 44.8409 34.1642 44.334 33.5606C44.2646 33.4782 44.6624 32.9131 44.7072 32.8983C46.5615 34.5637 52.4339 40.0866 52.5232 39.9968C53.2463 39.2732 56.3997 35.7961 56.9394 34.5637C57.076 34.2521 56.9764 33.9601 56.6331 33.9187C55.6631 33.8014 52.1869 33.5243 52.0737 33.4608C52.4377 33.2544 57.4477 29.3106 57.8237 28.9472C58.0512 28.7276 58.0802 28.5689 57.7821 28.4413C56.6874 27.9726 55.5924 27.4986 54.4715 27.1001C53.6059 26.7923 51.0052 26.1764 50.5847 26.0873C50.4323 25.4433 49.82 23.1367 49.6521 22.6836C49.5373 22.3739 49.3651 22.4083 49.148 22.626C48.5243 23.2508 44.1573 27.7868 43.8109 28.1306C43.6134 27.8604 43.4617 27.6531 43.3374 27.4831C43.6882 27.0698 48.1679 22.2159 48.5969 21.7245C48.8575 21.4265 49.3224 20.8973 49.2284 20.4182C49.1019 19.7717 45.2829 10.4048 44.4466 9.08657C44.1974 8.6938 43.6762 8.67133 43.4302 9.06318C43.2043 9.42344 41.6052 12.1636 41.0843 13.1979C40.4837 14.3905 39.2312 17.2204 39.2312 17.2204C39.2312 17.2204 36.5766 17.0993 33.7727 17.2204C30.9689 17.3414 28.5596 17.7118 28.4517 17.6018C28.0836 17.2264 25.6444 13.6482 25.2715 13.1448C24.9444 12.7033 21.8887 8.68124 21.4456 8.16856C21.2493 7.94141 20.6038 7.89771 20.4691 8.33004C20.0358 9.7215 18.7183 13.7755 18.546 14.4265C18.2135 15.6858 16.2633 23.6724 16.0655 24.7025C16.0018 25.0344 14.0515 25.8332 13.3042 26.1739C12.0796 26.7326 8.52896 28.5974 7.97847 28.9608C7.66364 29.1687 7.78099 29.4364 8.00655 29.6156C9.22899 30.587 12.6714 33.184 13.2121 33.5606C13.0761 33.6216 8.09867 35.1985 7.4895 35.457C6.88411 35.7136 6.83585 36.175 7.3693 36.5128C7.9047 36.8519 22.5657 47.3369 22.5657 47.3369C23.8421 48.2985 26.1263 49.2545 27.6756 49.7438C27.6756 49.7438 46.7963 56.2499 48.567 55.9926C48.8795 55.9471 50.0256 55.6922 50.0256 55.6922C50.1342 55.6683 50.239 55.5659 50.2605 55.4603L50.9941 51.845L48.9766 53.1776L48.567 50.6792L46.5265 52.1487L46.1322 49.7438L44.0916 51.2133L43.6974 48.8084L41.6568 50.278L41.2626 47.8731L39.2223 49.3424L38.8278 46.9377L36.8377 48.3708L36.393 46.0023L34.4532 47.3993L34.3001 47.3369ZM28.5439 31.7737V36.3792C28.5439 37.0288 28.2528 37.1204 27.8937 36.58L23.4282 29.8598C23.0679 29.3175 23.2973 28.8812 23.9379 28.8812H27.1024V24.2757C27.1024 23.6262 27.3935 23.5345 27.7526 24.0749L32.218 30.7951C32.5784 31.3374 32.349 31.7737 31.7084 31.7737H28.5439ZM46.6473 30.8272C47.3225 30.8272 47.8699 30.2769 47.8699 29.5981C47.8699 28.9192 47.3225 28.3689 46.6473 28.3689C45.972 28.3689 45.4247 28.9192 45.4247 29.5981C45.4247 30.2769 45.972 30.8272 46.6473 30.8272Z"
				fillRule="evenodd"
			/>
		</svg>
	)
}
